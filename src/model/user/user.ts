import {User} from '../prismaModel';
import {PGConnect} from '../../utils';

abstract class MainUser<T> implements User {
    id: number = 0;
    name: string;
    photo: string | null = null;
    githubUserId: number | null = null;
    email: string | null = null;
    db: PGConnect;
    public constructor(db:PGConnect, name: string) {
        this.db = db;
        this.name = name;
    }
    public abstract createUser(): Promise<boolean|T[]>;
    public updateUser() {
        return this.db.connect(`
            update auth.user
            set name=$1
            where email=$2;
        `,[this.name, this.email])
        .then(res => {
            return res as boolean;
        });
    }
}

export {MainUser};