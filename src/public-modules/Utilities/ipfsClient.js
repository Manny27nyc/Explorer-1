import ipfsMiniAPI from "ipfs-mini";
import config from "public-modules/config";

const ipfsConfig = config.ipfs;

const ipfsMini = new ipfsMiniAPI(ipfsConfig);

export const addBufferToIPFS = (filename, bufferContent) =>
  new Promise((resolve, reject) => {
    // due to es5 issues - we load this via a CDN
    const ipfs = window.IpfsApi(ipfsConfig);

    ipfs.add([{ path: `/bounties/${filename}`, content: bufferContent }], (err, response) => {
      if (err) {
        reject(err);
      }
      resolve(response[1].hash);
    });
  });

export const addJSON = data =>
  new Promise((resolve, reject) => {
    ipfsMini.addJSON(data, (err, response) => {
      if (err) {
        reject(err);
      }
      resolve(response);
    });
  });
