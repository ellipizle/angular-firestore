export interface Profile {
    name: string;
    official: string;
    private: string;
    profileDescription: string;
    profileImg: string;
    url: string;
    username: string;
    website: string;
}

export interface ProfileStat {
    followers: number;
    following: number;
    posts: number;
    when: number;
}