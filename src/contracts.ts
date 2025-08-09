export interface IAddRemoteArguments {
    remoteName: string;
    gitLocation?: string;
    help: boolean;
}

export interface IRepositoryDetails {
    repository: {
        type: 'git';
        url: string;
    };
}
