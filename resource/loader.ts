interface ILoadedResource<T> {
    resource: T;
    url: string;
}

class ResourceManager {
    public static async loadResource<T>(url: string): Promise<ILoadedResource<T> | null> {
        return new Promise((resolve, reject) => {
            cc.loader.load(url, (err, resource) => {
                if (err) {
                    reject(err);
                } else {
                    const loadedResource: ILoadedResource<T> = {
                        resource: resource as T,
                        url: url
                    };
                    resolve(loadedResource);
                }
            });
        });
    }
}

// 示例使用
async function loadTexture() {
    const url = "texture.png";
    const loadedResource = await ResourceManager.loadResource<cc.Texture2D>(url);
    if (loadedResource) {
        const spriteFrame = new cc.SpriteFrame(loadedResource.resource);
        // 使用加载成功的 spriteFrame...
    } else {
        // 处理加载失败的情况...
    }
}

async function loadAudio() {
    const url = "bgm.mp3";
    const loadedResource = await ResourceManager.loadResource<cc.AudioClip>(url);
    if (loadedResource) {
        const audioSource = cc.audioEngine.play(loadedResource.resource, false, 1);
        // 使用加载成功的 audioSource...
    } else {
        // 处理加载失败的情况...
    }
}
