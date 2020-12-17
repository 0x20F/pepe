/**
 * Singleton to keep track of all registered
 * commands so that we don't create duplicates
 */
class CommandList {
    static _instance: CommandList;
    list: string[] = [];

    
    register(prefix: string): void {
        this.list.push(prefix);
    }


    each(callback: (e: string) => void) {
        this.list.forEach(callback);
    }

      
    static getInstance() {
        if (!CommandList._instance) {
            CommandList._instance = new CommandList();
        }

        return CommandList._instance;
    }
}


export const commands = (function() {
    return CommandList.getInstance();
})();

export default CommandList;