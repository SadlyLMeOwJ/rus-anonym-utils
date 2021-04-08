import utils from "../dist/main";
import assert from "assert";

describe("String section", () => {
	it("levenshtein", () => {
		assert.strictEqual(utils.string.levenshtein("test", "test2"), 1);
		assert.strictEqual(
			utils.string.levenshtein("test2", "test", {
				remove: 0,
			}),
			0,
		);
		assert.strictEqual(
			utils.string.levenshtein("test", "test2", {
				insert: 0,
			}),
			0,
		);
		assert.strictEqual(utils.string.levenshtein("TeSt", "test2"), 3);
	});

	it("declOfNum", () => {
		assert.strictEqual(
			utils.string.declOfNum(3, ["помидор", "помидора", "помидоров"]),
			"помидора",
		);
	});

	it("removeZalgo", () => {
		assert.strictEqual(utils.string.removeZalgo("ṫ̶̨̡̨̨̨̛̛̛̛̛̛̛̛̛̗̫͖̯̱̟̲̦̘̪̯̳̙̫͍͈̤̘͕̘̭͕͍̞̩̠̣͎͍͇̩͍̜͙̖͉̻͖̠̪̥͙͔̟̮̖͙̤̯̰̺̘̙̞͖̤͓͓̲͙̟̣͎͓̦͎̥̻̤̠̦̮̟̳̼̩̫̖̤̩̺̝̰͔͎̼̫͕͇̬̣̥͍̪̹̮͕̲̠͖̱̙͔̩̙̯̤̭̩̻̘̹͔̪͉̟̯̗̝̩̝̰̱͍̤͉̣̹͓̰̗̘̺̫͙̰̠̱̝̲̘̺̱̺̫͉͔̞̭͎̳͇͉͍̯̜̂̉͗͋̈̂̇̎͑̇̊̽͗͐͛̀̀̈́̈́͋͋͌̓̓̌̈̾̄̈́͆͛̊͋͐̿̉̒̈́͒͋̉̿̏̄͊̈́̄͗̌̂͑̈́͌̉̇̎͐̋̆̆̌͆̏̔́̏̑̔̎̓͌̇̎̈͌͒͛̈́́̏͊͗̀̀͋̃̊̃̀̑͑̑͌͂̑́̅͑̾͋̋͆̿͆̊̃̐̋́̀̐̒̊̄̈͌̆͐̄́͌̆͋̿̓͋̄͆͆̔̈́̎̆͋̿̋͗̑͗͗̂̍͐̈̾͗̐̂̈́͌̐̐̒̍͌͌̓̀̒̐͌̉̇̽̓̽̅̐͑̇̾̈̿̓̄̍̌̽̍̍͂̀͐̀̊̀̄̑̀͛̐̃͂̂̈̔̃̓͋͋͗̾̄̅̿̈͆̊̄̈́̀̉͗̓͋̋͛̀͒́̀͂̕̕̕̚͘͘̕͘͘͘͘̕͘̚̚͘͜͜͜͠͠͝͝͝͝͝͝͝͠͝͝͝͠͝ͅͅͅͅͅe̴̢̡̧̡̨̨̨̨̨̢̡̧̧̡̢̡̢̢̨̢̧̢̡̡̨̧̨̢̢̢̢̨̛̛̛̛̛̛̛̛̯̹̖̫͙̫̥͎̖̻͖̪͔͉̱͈̗̼̫̪̲͈̤̮̹̼̦̟͎̭̱̠̙̹̜͕̹̞̘̭̱̲̝̤̪̭̘̘̱͚̜͓̖̱͎̯̭͎̲̤͇̝̠̩͉͍͓̲͖͓͇̣͎͖̯͕͙̳̼͖͍̱̘̮̥̱̹̪̠̦̹̻̮͉̖͕̤̠̝͚͚̪̹̘̰̹̳͕̻͚̟̮͔̭̫̬̣͓͙̫̩̲̬̝̗̖̩̮̘͓̤̹͇̤̳͖̫̭̠̦̬͖̥͕̮͖̘͕̻̯͍̞̥͔̺̠̩͙͕̖̤͎̳̝͖̳̫̝̹͉̘̦̟͉̙̲̗̗͖̳̖̤̤̠͈͖̲̩̳̱̦̮͇̱̙̲̪̜̟͚͚̹̣͎͕̭͇̱̖̯̠̠̲̗͔̻̗̼̺̪͓̰͎̝̳̬̮͍͔̬͔͉̩͕̘̥̭͎͛̃̌̒̐̅̓̀̈̒̔̃̈̎͌͛̂͊̅̊̏͛̃͌̊̐̓̓͋̒̑̈́͒́̓͑͑̅̆͒͂̔͂͊͂͛̔̉͗̾̅́̒́͗̂̈̇́̅̊͛͗̈́͗̋́͑͂̾͌̀̈́̑̾̉́̅̄͒̆͊̋͑̌̀̾͒̈̈́̎͐̄͂́̀̂͗̆͗̓̂̏̀̃̓͌̂͐̈̃̎͛́̽̔̎̾̀͆̆͑̀̂̋̈͂̎̒̀̐̐́̃̄̋̿͌͗̌̔̍̐̀̏̿̌̏͐̆͐͌̀̌͒̎̌̂̑̋̔͂̇̀̎͒̋̔̔̈́̏̓̎̋͐̏̌̊̇̈͌͂͋̈́̇̐̎̍͒́̐̔̊̊͊̾̈́̎͊́͑̆͐̑̓͆̓̉̒̉͊͐͛̓͂̽̾̌̈́̃͐̊̍́̎̒̋́͐̓͐̈̇̄͑̊́͋̂̂̋̀̋͂̾͘̕̚̕̚̚̚̕͘͘͘͘͘͘͜͜͜͜͜͝͝͠͠͝͝͠͝͝͝͝͝͝͝͝͠͝͠͝ͅͅͅͅś̴̢̧̢̢̡̡̨̧̡̨̨̨̡̡̨̨̨̢̧̧̧̛̛̛̛͎̳̬̗̮̹̝̬̟̳̬̫͉̙̗̹͉̤̥͈̳̱̝̠̟͕̦̟͚̝̦͕̝̮̦͕͍̻̙̰̜̠͇̬̹̮̙̜̟̤͕̫̯͇̝̦͇͔̟̪͚̣͔̗̤͔̟̦̲͎̰͔̗͇̠̠͔̩͇̠̳̟̩̖̺̻͚͉̗̳̹̦̙̻̠̜͇̦̲̬͕̻̘͚͓̱͎̩̦̖̞͎͍͓̫̙͕͓̥͕͕̩͓̹͓͍͈̫̞͇̭̟͙̥͍̪̘̤̠̹͍̥͍̩̯̖͕̳̜̼͖͕̙̦͈̼͇͓̣͎̬̰̩̣̰̬̤͇̰͍̜͔̭̦̬̦̲̹͙͇̟̯̜̥̺̲̭͉͍̯͉͎̲͔͕̺̺͖͓̭̥̲̖̬͎͚̹̯͇͈͙͍̤͔̩͎̹̭̜̻̦͔̣̫̺͉̖̻̜͈̻̻̣̮̗͉͚̩̤͎̬̖̣̭̮̪͎͔̭̟̐̉͌̍̉̋̃̀̿͊̾̍͗̆̈́̽̉͆͗̀̏̀̓̀̾͌̃̃́̏̀̽̒͂̊̉͒̒̆̽͌͒̌̋̀͑͗̈́͂͗́͂̽͂̌̔̐͋͌̉̆̉͌͂͌̀͐͆̊̓̊͐͛̋̇͊̈́̔̓͂͗̊̿̈͒̎̈́̌͋̈́͆̈́̂̏͗̃͌͛̐̓̀̃̈́̔̂̽̽̿͂͊͒́͐̉̑̏͗̏̓̐̍̃̆́̒͆́̔̃́̐͋̍̍͌́̈́̑̏͘̕̕̕̕͘̚͘̕͜͜͜͜͜͜͜͜͠͝͝͝͠͝͝͝͝͠͠͝ͅͅͅͅt̵̨̢̨̢̢̨̧̡̢̢̡̡̧̛̛̛̯̩̱̤̤̬͍̠̮̼̹͇̟͎̤̰͎̬̼͈̰̗̯͙̲̝̹̺̹̫̱̥̫̬̪̥̗̠̯̺͇̩̩̦̙̝͙͍̞̙̟̬͉͈̩͕͈̖̫̠̩̤̥͙̣͕͕̘̙̮̭̥̮̗̙̲̳̜̝͕͈͖̼͈̫͔̘̣̘̬̩̹̪̰͔̦̟̤͎͙̻̣̲̯̩͚̳̹̝͚̠̫̝͈͓͕̳̜̣͚̠̯̮͚̮̮͇̠̦͎̃̋̈́̇͆̑͒̀̾͆̃̀̉͒̂͑́̄͆̎̈́͑͑̉̒̈́͗͆̃̑̈́̊̓͗̇̅͗̀̈́̅̅̍́̏̋̔͋̆̂̈́́́͋͆̽̇̒̃̍͛͂̂̏͗̎̏̄͛̃̏͆̄͋̋̏̔͒̔̉́̾͋̑̈́̏̊̈́͑́͑̌̏̋̌̈́̅͒̽̃͂̐͛̑̿̑̉̎́́͑̄͑̊̉̃̎̌͐͑̎̿͒̋̆̈́̽̌̾̀̕̚͘͘̕͘̕̕͜͜͝͝͠͝͠͠͝͝͝͠͠͝͠ͅͅͅͅͅͅͅͅ"), "test");
		assert.strictEqual(utils.string.removeZalgo("ţ̴̨̢̡̧̧̨̛̛̛͍͙̖̜͕͓̯͓̦͈͈̘̺̦̥͇͖̥̲̼͓̪͕̟̖̮̠̥̣̭̟̺͉͓̙̞̖͔̮͖̼̣̞̗̟̩̤̤̹͈̝̲̝̲̦͕̝̻̞̟̞̩̙̇̿̈̅͗̃̌͋̂̈́̎̋͑͒̽͗͌̇̎́͊̓͛̔́͐̀̄͋̒̀̊́͐̓͋̑̎͆͑̆͛̔͆̍̽̑̏̋̈́̂̑̐̆̋̌͆̂͗̂͂͛̀̉̈́͑̈̑́̑̈́̓̇͊͐̓̒̋͛͊̆͐̐̎̐̏̍̊̅̿̔̀̍̾͑̈́͑̊̋͐̉̔́̔̈́̊̚͘̕͘̕̚̚̕͘͜͜͜͜͜͝͠͝͝͠͠ͅͅͅͅȩ̸̨̢̨̢̨̡̛͉̮̫̠̗̰͚͙̠͕̙͓̟̯̥̠͕̳̩̯̥̫̘̦͕̣̪͍͓͓̮͍̞͓̠̝͇̞̙̫̝͉̝͖̙̺̖̥͓̫̼̩͍̖͍̘͙̜͙̹̖̳̥̜̙̫̦͍̝͕͉̭̖̰͈̮͉̰̳̥̬͙͉͙̯͚̩̜̳̪̦̞̦͍̭̣̭͉̤̭͙͓̗̠͈̪̟̻̝͕̯̫͎̻̹̗̩͕͚̜̮̮͇̤̖̞͔̝͓͇̺̤̠͕̹̩̻̜̻̣̱͇̣͎̺̥̤̗͓̲̹͖͈͙̳̝͓̜̜̯̻̻́̓̊̄̓́̉͆͋͐̑͑̋̌̉̿̓̕̚͜͜͜͜͜͠ͅͅͅͅͅs̴̛̛̛̹̯̹͖̠̟̱͉͗͒͂̈́̅̌̂̍̐̀́͌̋̓̾̈́́͛̾́̋͒̽͆̀̒̉̂̍̊͌̎̇̏́̽̓͆̒́̊̅̽̎͊̐̂͛̄͒̀̔̍̌͊͂̓͒͊͌̓̓̈͑̐͐̈́̇̌͑̄̃͊̽͗͒̈́́͛͐͋́͂͐̑̍̓̎̇͑̀̅̄̈͛̏̔̀͛̊͊̌̑͑̔͋̔̍̀͋̿͆̆͑̄͋̿̅̉̂͛̄̔̊͑̈́̀͐́̎͂̓̍̂̊̂̈̋̊̌̋̊̂͋̔̕͘͘̚̚͘͘͘̚̕̚̚͠͠͝͠͝͝͝͠͝͠͝͠ţ̶̢̨̧̧̡̡̨̨̡̡̨̢̧̡̧̞̝̻̦̩̮͎̠̰̫̤͉̜̙̹̗̗̹͉̺͈͙͕̖̘͍̫̝̜͔̳̗͔̜͉͕͇͓̬͓̞͖̝͈͇̬̫͍̳͖̥͓̰͕͍̖̜̯̣̫̘̗͖͓͎̲̳͍͕͕̣͈͕̗̖̙̘̜̙̺̜̘͎͚̗̥̹̙̖̘̥̜̜̣̜̗͍̹͎̩̘̲̣̫̩̺̲̲͕̥̣͍̺̘̺͍̰̜̘̱̠̪͎̜̣̖̜͎̘̼̭̙͖̦̭̳̝̗͚͖̬͗̾́͜͜͜ͅͅͅͅ"), "test");
		assert.strictEqual(utils.string.removeZalgo("t̸e̴s̵t̶"), "test");
		assert.strictEqual(utils.string.removeZalgo("test"), "test");
	});
});
