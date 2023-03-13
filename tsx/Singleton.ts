export default class Singleton {
    private static instance: any;
    protected constructor() { }
    public static inst<T extends Singleton>(this: new () => T): T {
        if (!Singleton.instance) {
            Singleton.instance = new this();
        }
        return Singleton.instance;
    }
}
