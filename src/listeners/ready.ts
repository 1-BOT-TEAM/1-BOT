import { ApplyOptions } from '@sapphire/decorators';
import { Listener, Store } from '@sapphire/framework';
import { blue, gray, green, magenta, magentaBright, white, yellow } from 'colorette';
import { PresenceStatus } from '../config/Config';

const dev = process.env.NODE_ENV !== 'production';

@ApplyOptions<Listener.Options>({ once: true })
export class UserEvent extends Listener {
	private readonly style = dev ? yellow : blue;

	public run() {
		this.printBanner();
		this.Activity();
		this.printStoreDebugInformation();
	}

	private Activity() {
		const { client } = this.container;
		setInterval(() => {
			const status = PresenceStatus.activities[Math.floor(Math.random() * PresenceStatus.activities.length)];
			client.user?.setPresence({ activities: [{ name: status, type: 'WATCHING' }], status: PresenceStatus.status });
		}, PresenceStatus.interval);
	}

	private printBanner() {
		const success = green('+');

		const llc = dev ? magentaBright : white;
		const blc = dev ? magenta : blue;

		const line01 = llc('');
		const line02 = llc('');
		const line03 = llc('');

		// Offset Pad
		const pad = ' '.repeat(7);

		console.log(
			String.raw`
${line01} ${pad}${blc('1.0.0-BETA')}
${line02} ${pad}[${success}] Gateway
${line03}${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''}
		`.trim()
		);
		console.log(gray(`\t${magenta('Sapphire')}${white(' Framework')}`));
		console.log(String.raw`
		
    _   ____________  ____     ________    _   __
   / | / / ____/ __ \/ __ \   / ____/ /   / | / /
  /  |/ / __/ / /_/ / / / /  / /   / /   /  |/ / 
 / /|  / /___/ _, _/ /_/ /  / /___/ /___/ /|  /  
/_/ |_/_____/_/ |_|\____/   \____/_____/_/ |_/   
		
		`);
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: Store<any>, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}
