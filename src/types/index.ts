

export interface IResponse<T>{
    statusCode:number;
    success:boolean;
    message:string;
    data:T
}


export interface ISidebarItem {
    title: string;
    items:{
            title: string;
            url:string;
            component?:ComponentType;
        }[]
}


export type IRole  = "ADMIN" | "USER" 