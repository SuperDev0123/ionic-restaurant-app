import { pwUnits, doNotDestroyUnits } from "./config";

export const ramp = {
    passiveMode: true,
    que: [],
    __isInitialized: false,

    __displayAds: async function (path = null) {
        if(this.__isInitialized){
            if(path !== null) await this.setPath(path);
            const units = await this.getUnits();
            const unitsToBeDestroyed = getUnitsToBeDestroyed(units);
            await this.destroyUnits(unitsToBeDestroyed);
            this.addUnits(pwUnits).then(() => {
                this.displayUnits();
            }).catch( (e) =>{
                // catch errors
                this.displayUnits();
                console.log(e);
            });
        }
    },

    onReady: function () {
        this.__isInitialized = true;
        this.__displayAds();
    }
};

function getUnitsToBeDestroyed(units) {
    if(!Array.isArray(units) || units.length === 0) {
        return 'all';
    } else {
        return units.filter(unit => {
            return !doNotDestroyUnits.includes(unit);
        });
    }
}