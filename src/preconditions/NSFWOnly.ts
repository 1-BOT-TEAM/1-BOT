import { AllFlowsPrecondition } from '@sapphire/framework';
import type { CommandInteraction, ContextMenuInteraction, Guild, Message } from 'discord.js';

export class NSFWPrecondition extends AllFlowsPrecondition {
	#message = 'this command can only be used in NSFW channels';

	public override async messageRun(message: Message) {
		return this.doChannelCheck(message.guild);
	}

	public override async chatInputRun(interaction: CommandInteraction) {
		// for slash command
		return this.doChannelCheck(interaction.guild);
	}

	public override async contextMenuRun(interaction: ContextMenuInteraction) {
		// for Context Menu Command
		return this.doChannelCheck(interaction.guild);
	}

	private doChannelCheck(guild: Guild | null) {
		return guild?.nsfwLevel === 'EXPLICIT' ? this.ok() : this.error({ message: this.#message });
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		NSFWOnly: never;
	}
}
