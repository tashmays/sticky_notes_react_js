class ItemsController < ApplicationController
	def create
		item = Item.create(item_params)
		render json: item 
	end

  def new
  	
  end

  def edit
  	@item = Item.find(params[:id])
  end

  def update
  	
  end

  def destroy
  	@item = Item.find(params[:id])
  	@item.destroy
  	render json: Item.all
  end

	private

		def item_params
			params.require(:item).permit(:name)
		end
end
