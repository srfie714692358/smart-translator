// Description: This module contains Storage class that is used to manage data in storage.
// version: 0.1.0

/**
 * ## Storage
 * You can use this class to manage data in storage
 * @param key - storage key
 * @param data - the data you want to storage
 * @param loadData - you can load data from storage
 * @param saveOnChange - you can make this storage that save data after any change.
 *
 *    ****************
 *    ****************
 *
 * ## Properties:
 * * error: It will store the error if any error occurs while loading or saving the data.
 * * status: It will store the status of the data. "saved" or "unsaved" or "loaded".
 * * then: Run a function after request sent to storage (load or save data).
 *
 *    ****************
 *    ****************
 *
 * ## Methods:
 * * load: Load data from the storage.
 * * save: Save the data in storage.
 * * get: Get the data.
 * * set: Set new data.
 * * update: Update the data with new data. (it will merge them.)
 *
 *    ****************
 *    ****************
 *
 * ## Examples:
 * ```typescript
 * // example 1:
 * const storage = new Storage<ConfigType>("app-config", {"id": 1, "app-name": "app-name"}, saveOnChange=true);
 * storage.then = data => console.log(storage.status)
 * storage.update({"id": 1, "app-name", "second-name"})
 * ```
 */
export default class Storage<DataT> {
	/**
	 * storageKey: A key to save data in storage.
	 * data: the data will saved in storage.
	 * saveOnChange: If this was on, it will save data in storage after any change.
	 * processing: If this was true, it means a request sent to storage, so should not start another process until get respond
	 * then: It keeps a function that will run after each request is sent to storage.
	 * error: If the response received was an error, this will keep it.
	 * status: It will keep status of data, it's saved, unsaved or loaded.
	 */
	private storageKey: string;
	private data: DataT | null;
	private saveOnChange: boolean;
	private processing: boolean;
	public then: (data: DataT | null) => void;
	public error: unknown;
	public status: "saved" | "unsaved" | "loaded";

	constructor(key: string, data: DataT = {} as DataT, loadData: boolean = false, saveOnChange: boolean = false) {
		this.storageKey = key;
		this.data = null;
		this.error = null;
		this.processing = false;
		this.status = "unsaved";
		this.saveOnChange = saveOnChange;
		this.then = (data) => console.log(data);

		if (loadData) {
			this.load();
		} else {
			this.data = data as DataT;
		}
	} // End of constructor

	// Send request to storage (get data or set data)
	private async requestToStorage(request: () => void): Promise<void> {
		while (this.processing) sleep(1000); // Sleep until the other process finished.
		this.processing = true; // Set processing on to don't send multiple request to storage
		try {
			await request(); // Send request (get data or set data)
		} catch (error) {
			console.log("Error on loading app config from storage:", error);
			this.error = error;
		}
		this.processing = false; // Set processing off to make it able to send new request to storage
		this.then(this.data);
	}

	// Load data from the storage
	public async load(): Promise<void> {
		this.requestToStorage(async () => {
			const storedConfig = (await chrome.storage.local.get(this.storageKey)) as { [key: string]: DataT };
			if (storedConfig) {
				// If there is data and the it's type is correct, load it on memory
				this.data = storedConfig[this.storageKey];
				this.status = "loaded";
			}
		});
	} // End of load method

	// Save the data to the storage
	public async save(): Promise<void> {
		this.requestToStorage(async () => {
			chrome.storage.local.set({ [this.storageKey]: this.data });
			this.status = "saved";
		});
	} // End of save method

	// Return data
	public get(): Readonly<DataT> | null {
		return this.data;
	} // End of getAll method

	// Set new data
	public set(data: DataT): void {
		this.status = "unsaved";
		this.data = data;
		if (this.saveOnChange) this.save();
	} // End of set data

	// Merge previous data and new data
	public update(data: DataT): void {
		this.set({ ...this.data, ...data });
	} // End of update method
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
