const NativeUI = require("./TechGames/nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const UIMenuCheckboxItem = NativeUI.UIMenuCheckboxItem;
const UIMenuSliderItem = NativeUI.UIMenuSliderItem;
const BadgeStyle = NativeUI.BadgeStyle;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;
const Color = NativeUI.Color;
const ListItem = NativeUI.ListItem;


const ScreenRes = mp.game.graphics.getScreenResolution(0,0);
const MenuPoint = new Point(ScreenRes.x +150, 50);

// MENÜ Interaktionen
mp.events.add("client:blazing:openInteractionMenu",(canInvite,ranks) => {
    const ui_main_interaction = new Menu("Blazing Interaktion", "Interagieren.", MenuPoint);
    ui_main_interaction.Visible = false;
    if (canInvite == "Y") {
        ranks = JSON.parse(ranks);
        ui_main_interaction.AddItem( new UIMenuListItem("Einstellen","Person einstellen als: ", BennyRanks = new ItemsCollection(ranks)));
        ui_main_interaction.AddItem(new UIMenuItem("Entlassen", "Person entlassen"));
    }
    ui_main_interaction.AddItem( new UIMenuItem("Schließen", "Schließt das Menü"));
    ui_main_interaction.Visible = true;

    ui_main_interaction.ItemSelect.on((item, index, value) => {
        if (item.Text == 'Einstellen') {
            mp.game.graphics.notify("Du stellst die Person ein als: "+item.SelectedItem.DisplayText);
            mp.events.callRemote("server:blazing:hirePlayer", item.SelectedItem.DisplayText);
        } else if (item.Text == 'Entlassen') {
            mp.game.graphics.notify("Du entlässt die Person!");
            mp.events.callRemote("server:blazing:firePlayer");
        } else if (item.Text == 'Schließen') {
            ui_main_interaction.Close();
        }
    });
});
// MENÜ FAHRZEUGE
mp.events.add("client:blazing:openDutyMenu", () => {
const ui_main_duty = new Menu("Blazing", "Blazing Tattoo", MenuPoint);
    ui_main_duty.Visible = false;
    ui_main_duty.AddItem( new UIMenuItem("Dienst beginnen", "Zum Dienst melden"));
    ui_main_duty.AddItem( new UIMenuItem("Dienst beenden", "Vom Dienst abmelden"));
    ui_main_duty.AddItem( new UIMenuItem("Leitstelle", "Die Leitstelle übernehmen"));
    ui_main_duty.AddItem( new UIMenuItem("Schließen", "Schließt das Menü"));
    ui_main_duty.Visible = true;
    var blazingLeitstelle = 950;
    

    ui_main_duty.ItemSelect.on((item, index, value) => {
        if (item.Text == 'Dienst beginnen') {
            mp.events.callRemote("server:blazing:onDuty");
            ui_main_duty.Close();
        } else if (item.Text == 'Dienst beenden') {
            mp.events.callRemote("server:blazing:offDuty");
            ui_main_duty.Close();
        } else if (item.Text == 'Leitstelle') {
            mp.events.callRemote("server:phone:getLeitstelle", blazingLeitstelle);
        } else if (item.Text == 'Schließen') {
            ui_main_duty.Close();
        }
    });
});
