describe MyProfileController do
  before do
    allow(Settings.hub_edos_proxy).to receive(:fake).and_return true
    allow(Settings.campus_solutions_links).to receive(:fake).and_return true
  end
  let(:user_id) { random_id }

  describe '#get_feed' do
    let(:feed) { :get_feed }
    let(:feed_key) { 'student' }

    it_behaves_like 'an unauthenticated user'

    context 'authenticated user' do
      it_behaves_like 'a successful feed'
    end
    context 'view-as session' do
      context 'advisor-view-as' do
        let(:view_as_key) { SessionKey.original_advisor_user_id }
        let(:expected_elements) { %w(addresses affiliations emails emergencyContacts identifiers names phones urls residency gender) }
        it_behaves_like 'a successful feed during view-as session'
      end
    end
  end

end
