class MyAcademicsController < ApplicationController
  include AllowDelegateViewAs
  before_filter :api_authenticate
  before_filter :authorize_for_enrollments

  def get_feed
    if current_user.authenticated_as_delegate?
      feed = MyAcademics::FilteredForDelegate.from_session(session).get_feed_as_json
    elsif current_user.authenticated_as_advisor?
      feed = MyAcademics::FilteredForAdvisor.from_session(session).get_feed_as_json
    else
      feed = MyAcademics::Merged.from_session(session).get_feed_as_json
    end
    sleep 30
    render json: feed
  end

  def residency
    if current_user.authenticated_as_delegate?
      render json: {}
    else
      render json: MyAcademics::Residency.from_session(session).get_feed_as_json
    end
  end

end
