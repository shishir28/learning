/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}


//shishir required to import JSON file as module in angular services or components
declare module "*.json" {
  const value:any;
  export default value;
}
