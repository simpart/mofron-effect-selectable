/**
 * @file mofron-effect-selectable/index.js
 * @brief selectable effect for mofron component
 * @license MIT
 */
const Click   = require("mofron-event-click"); 
const Color   = require("mofron-effect-color");
const ConfArg = mofron.class.ConfArg;
const comutl  = mofron.util.common;

module.exports = class extends mofron.class.Effect {
    /**
     * initialize effect
     * 
     * @param (mixed) 
     *                key-value: effect config
     * @short
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("selectable");
            
	    this.eid(100);
            this.speed(300);

            /* init config */
            this.confmng().add('mainColor',   { type:'color' });
	    this.confmng().add('baseColor',   { type:'color' });
	    this.confmng().add('accentColor', { type:'color' });

	    if (0 < arguments.length) {
                this.config(p1);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    
    clickEvent (c1,c2,c3) {
        try {
	    c3.component().execEffect(c3.eid());
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    
    component (prm) {
        try {
            if (undefined !== prm) {
                prm.event(
		    new Click(new ConfArg(this.clickEvent,this))
		);
                let eff_clr = this.color();
                for (let ec_idx in eff_clr) {
                    if (null !== eff_clr[ec_idx]) {
		        prm.effect([
			    new Color({
			        eid:this.eid(), type:ec_idx, speed:this.speed(), color:this[ec_idx+'Color']()
                            }),
                            new Color({
			        eid:this.eid()+1, type:ec_idx, speed:this.speed(), color:prm[ec_idx+'Color']()
			    })
			]);
		    }
		}
            }
            return super.component(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;    
        } 
    }
    
    value (prm) {
        try {
            return this.color(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    clear () {
        try {
            this.component().execEffect(this.eid()+1);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    color (p1,p2,p3) {
        try {
	    if (undefined === p1) {
                return {
		    'main':   this.mainColor(p1),
		    'base':   this.baseColor(p2),
		    'accent': this.accentColor(p3)
		};
	    }
            this.mainColor(p1);
            this.baseColor(p2);
            this.accentColor(p3);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    mainColor (prm) {
        try {
            return this.confmng('mainColor', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    baseColor (prm) {
        try {
            return this.confmng('baseColor', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    accentColor (prm) {
        try {
            return this.confmng('accentColor', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
}
/* end of file */
