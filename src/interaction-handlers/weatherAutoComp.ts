import { InteractionHandler, InteractionHandlerTypes, PieceContext } from '@sapphire/framework';
import type { AutocompleteInteraction } from 'discord.js';
export class AutocompleteHandler extends InteractionHandler {
	public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
		super(ctx, {
			...options,
			interactionHandlerType: InteractionHandlerTypes.Autocomplete
		});
	}
	public override async run(interaction: AutocompleteInteraction, result: InteractionHandler.ParseResult<this>) {
		return interaction.respond(result);
	}
	public override async parse(interaction: AutocompleteInteraction) {
		// Only run this interaction for the command with ID '1000802763292020737'
		if (interaction.commandId !== '1045894644107587624') return this.none();
		// Get the focussed (current) option
		const focusedOption = interaction.options.getFocused(true);
		// Ensure that the option name is one that can be autocompleted, or return none if not.
		switch (focusedOption.name) {
			case 'location': {
				// Auto complete the location country name based on the user's input
				// use city.list.json
				const city = require('../lib/api/city.list.json');
				const input = focusedOption.value;
				const result = city.filter((item: WeatherAutoCompJson) => item.title.toLowerCase().startsWith(input.toLowerCase()));
				return this.some(result.slice(0, 5).map((item: WeatherAutoCompJson) => ({ name: item.title, value: item.id })));
			}
			default:
				return this.none();
		}
	}
}
interface WeatherAutoCompJson {
	id: number;
	title: string;
}
