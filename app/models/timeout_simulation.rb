class TimeoutSimulation < BaseProxy
  include ClassLogger

  def initialize(timeout)
    @timeout = timeout.try(:to_i) || 30
  end

  def get_feed
    actual_timeout = sleep @timeout
    {
      actual_timeout: actual_timeout
    }
  end
end
