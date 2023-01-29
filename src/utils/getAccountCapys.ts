import { JsonRpcProvider, Network, SuiAddress, ObjectId } from "@mysten/sui.js";

interface Capy {
  id: ObjectId;
  gen: number;
  url: URL;
  link: URL;
  genes: string;
  dev_genes: string;
  item_count: number;
  attributes: CapyAttributes;
}

interface CapyAttributes {
  pattern: string;
  main: string;
  secondary: string;
  emotion: string;
  ears: string;
}

export interface CapyObject extends Capy {
  name: string;
  SVG: string;
}

const getCapyObject = async (capyId: ObjectId): Promise<CapyObject> => {
  try {
    // FIXME remove log
    console.log(`want to learn more for Capy ${capyId}`);
    // get capy object
    const capyObjectApiResponse = await fetch(
      `https://api.capy.art/capys/${capyId}/`
    );
    const capyObject = await capyObjectApiResponse.json();
    // get capy svg
    const capySVGApiResponse = await fetch(
      `https://api.capy.art/capys/${capyId}/svg`
    );
    let capySVG = await capySVGApiResponse.text();
    // remove sui logo from capy
    const logoStartIndex = capySVG.indexOf("<g xmlns");
    const logoEndIndex = capySVG.indexOf("</g>", logoStartIndex) + 4;
    capySVG = capySVG.slice(0, logoStartIndex) + capySVG.slice(logoEndIndex);
    // create capy name
    const capyName = `${capyObject.attributes.emotion} ${
      capyObject.attributes.pattern
    } 0x${capyObject.id.substring(0, 5)}`;
    // return capy object
    // FIXME remove log
    console.log({ ...capyObject, name: capyName, SVG: capySVG });
    return { ...capyObject, name: capyName, SVG: capySVG };
  } catch (error) {
    throw error;
  }
};

const getAccountCapys = async (
  accountAddress: SuiAddress
): Promise<CapyObject[]> => {
  const provider = new JsonRpcProvider(Network.DEVNET);
  try {
    //FIXME console debug
    console.log(`fetching the Capys for ${accountAddress}`);
    // get all account objects
    const accountObjects = await provider.getObjectsOwnedByAddress(
      accountAddress
    );
    // filter out the Capys from all account objects and get their ids
    const accountCapysIds = accountObjects
      .filter((item) => item.type.includes("capy"))
      .map((item) => item.objectId);

    // return if the account doesn't have any Capys
    if (accountCapysIds.length === 0) return [];

    // get Object for each Capy
    const accountCapysObjects = await Promise.all(
      accountCapysIds.map(async (capyId) => await getCapyObject(capyId))
    );

    return accountCapysObjects;
  } catch (error) {
    throw error;
  }
};

export default getAccountCapys;
