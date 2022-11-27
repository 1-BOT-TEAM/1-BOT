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
        if (interaction.commandName !== '1045894644107587624') return this.none();
        // Get the focussed (current) option
        const focusedOption = interaction.options.getFocused(true);
        // Ensure that the option name is one that can be autocompleted, or return none if not.
        switch (focusedOption.name) {
            case 'location': {
                // openweathermap.org has a list of cities that can be used for autocomplete
                const cities = await fetch('https://raw.githubusercontent.com/mledoze/countries/master/countries.json').then((res) => res.json());
                // Get the value of the option
                const value = focusedOption.value;
                // Filter the cities to those that match the value
                const filteredCities = cities.filter((city: { name: string; }) => city.name.toLowerCase().startsWith(value.toLowerCase()));
                // Return the filtered cities as the result
                return this.some(filteredCities);
            }
            default:
                return this.none();
        }
    }
}