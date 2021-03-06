describe CampusSolutions::AidYears do
  let(:proxy) { CampusSolutions::AidYears.new(fake: true, user_id: '12345') }
  subject { proxy.get }
  it_should_behave_like 'a simple proxy that returns errors'
  it_behaves_like 'a proxy that properly observes the finaid feature flag'
  it_behaves_like 'a proxy that got data successfully'
  it 'returns data with the expected structure' do
    expect(subject[:feed][:finaidSummary][:finaidYears]).to be
  end
end
