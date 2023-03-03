export interface IRouteConfig {
    path: string,
    title: string,
    parent?: boolean,
    layout?: React.FC,
    children?: IRouteConfig[],
    compent?: React.LazyExoticComponent<React.FC>,
}