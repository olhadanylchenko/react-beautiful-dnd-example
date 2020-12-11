const initialData = {
  assets: {
    "asset-1": {
      id: "asset-1",
      content: "Take out the garbage",
    },
    "asset-2": { id: "asset-2", content: "Watch my favorite show" },
    "asset-3": { id: "asset-3", content: "Change my phone" },
    "asset-4": { id: "asset-4", content: "Cook dinner" },
  },
  versions: {
    "version-1": {
      id: "version-1",
      title: "Version 1",
      assetIds: ["asset-1", "asset-2"],
    },
    "version-2": {
      id: "version-2",
      title: "Version 2",
      assetIds: ["asset-3", "asset-4"],
    },
  },
  versionOrder: ["version-1", "version-2"],
};
export default initialData;
