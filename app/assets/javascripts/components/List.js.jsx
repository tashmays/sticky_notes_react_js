var List = React.createClass({
	getInitialState: function() {
		return { items: this.props.items }
	},

	getDefaultState: function() {
		return { items: []};
	},

	showAddForm: function() {
		this.setState({ showAdd: !this.state.showAdd});
	},

	addItemForm: function() {
		if(this.state.showAdd){
			return(<div>
						   <form onSubmit={this.submitItem}>
						   	 <div className='input-field'>
						   	   <input autoFocus='true' placeholder='add item' type='text' onChange={this.addItemName} />
						   	   <button className='btn waves-effect' type='submit'>Save</button>
						   	 </div>
						   </form>
						 </div>);
		}
	},

	addItemName: function(e) {
		this.setState({ itemName: e.currentTarget.value });
	},

	submitItem: function(e) {
		e.preventDefault();
		var name = this.state.itemName;
		var self = this;
		$.ajax({
			url: '/items',
			type: 'POST',
			data: { item: { name: this.state.itemName }},
			success: function(item) {
				var items = self.state.items;
				items.push({ name: item.name, complete: item.complete });
				self.setState({ items: items, showAdd: false, itemName: null });
			}
		});
	},

	completeItem: function () {
		$.ajax({
			url: '/items',
			type: 'PUT',
			success: function(item) {
				var items = self.state.items;
				items.push({ name: item.name, complete: item.complete });
				self.setSate({ items: items, showComplete: false, itemName: null });
			}
		});
	},


	displayItems: function() {
	var items = [];
	var self = this;
  this.items.forEach(function(item) {
		var id = "checkbox" + i;
		items.push(<li>
		            <div className='row'>
		            	<div className='col s10'>
		            		{this.state.items[i].name}
		            	</div>
		            	<div className='col s2'>
		            		<input type='checkbox' id={id} checked={item.complete} />
		            		<label htmlFor={id}>Comlete?</label>
		            		<br />
		            		<br />   
		            		<a onClick={() => this.deleteItem(item.id)}>Delete</a> 
		            	</div>
		            </div>
							</li>);
	})
	return items;
	},

	deleteItem: function(id) {
		var self = this;
		var url = '/items/' + id;
		$.ajax({
			url: url,
			type: 'DELETE',
			success: function(items) {
		    self.setState({ items: items, showAdd: false, itemName: null });
			}
		});
	},
	


	render: function() {
		return(<div>
				     <a className='waves-effect waves-light btn' onClick={this.showAddForm}>Add Item</a>
				     {this.addItemForm()}
				     <div className='card blue-grey darken-1'>
				     	 <div className='card-content white-text'>
				     	 	 <span className='card-title'>To Do List</span>
				     	 	 {this.displayItems()}
				     	 </div>
				     </div>
				   </div>);
	}	
});