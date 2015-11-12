 var Controller = {        
        getData : function() {
            Model.data;
        },

        updateData : function(data, position) {
            Model.set(data, position);// position ~= column 
            this.getData(); 
        },

        eventHandler : function(input) {
            if(input.target.className === 'submit') {
                this.updateData(data, end_of_list);
                
            }
        }
    };