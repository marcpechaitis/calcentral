module FinancialAid
  class MyAwardComparison < UserSpecificModel
    include Cache::CachedFeed
    include Cache::UserCacheExpiry
    include Cache::RelatedCacheKeyTracker

    def get_feed_internal
      return {} unless is_feature_enabled
      {
        aid_years: FinancialAid::MyAidYears.new(61889).get_feed,
        message: CampusSolutions::MessageCatalog.get_message(:financial_aid_award_comparison_card_info).try(:[], :descrlong),
      }
    end

    def instance_key
      "#{@uid}-#{my_aid_year}"
    end
  end
end
