import { SchedulerConfig, SchedulerEventModelConfig, SchedulerResourceModelConfig, ResourceTimeRangeModelConfig } from '@bryntum/schedulerpro';
import { MyTimeRangeStore } from './lib/MyTimeRange';

// instantiate store for time ranges using our new classes
const myTimeRangeStore = new MyTimeRangeStore();

export const schedulerConfig: Partial<SchedulerConfig> = {
    eventStyle        : 'colored',
    resourceImagePath : 'assets/users/',

    features : {
        timeRanges : {
            showCurrentTimeLine : true,
            showHeaderElements  : false
        }
    },

    columns : [
        { type : 'resourceInfo', text : 'Fitters', field : 'name', width : '20em' }
    ],

    project : {
        // use our store for time ranges (crudManager will load it automatically among other project stores)
        timeRangeStore : myTimeRangeStore
    },

   crudManager : {
        autoLoad  : true,
        transport : {
            load : {
                url : './assets/data/data.json'
            }
        },
        // This config enables response validation and dumping of found errors to the browser console.
        // It's meant to be used as a development stage helper only so please set it to false for production systems.
        validateResponse : true
    },
 
    barMargin : 5,
    allowOverlap              : false,
    zoomOnTimeAxisDoubleClick : false,
    zoomOnMouseWheel          : true,
    createEventOnDblClick     : false,
    startDate  : new Date(2024, 6, 1, 0),
    endDate    : new Date(2024, 11, 31, 0),
    viewPreset : {
        tickWidth : 50,
        base      : 'dayAndWeek'
    }
    
};
