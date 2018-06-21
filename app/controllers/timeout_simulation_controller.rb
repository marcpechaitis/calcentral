class TimeoutSimulationController < ApplicationController

  def get
    timeout = params[:timeout]
    render json: TimeoutSimulation.new(timeout).get_feed.to_json
  end
end
