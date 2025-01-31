export interface ManifestT {
	name: string;
	version: string;
	description?: string;
	author?: string | { name: string; email?: string; url?: string };
	manifest_version?: number; // Important for Chrome extensions
	[key: string]: unknown; // Allow other properties
}

export function getManifestData(): ManifestT | null {
	if (chrome && chrome.runtime && chrome.runtime.getManifest) {
		const manifest = chrome.runtime.getManifest() as ManifestT;
		return manifest;
	}
	return null;
}
