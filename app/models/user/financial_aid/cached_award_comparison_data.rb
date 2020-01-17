module User
  module FinancialAid
    class CachedAwardComparisonData < UserSpecificModel
      include Cache::CachedFeed
      include Cache::UserCacheExpiry
      include Cache::RelatedCacheKeyTracker

      def initialize(uid, aid_year, effective_date)
        @uid = uid
        @aid_year = aid_year
        @effective_date = effective_date
      end

      def instance_key
        "#{@uid}-#{@aid_year}-#{@effective_date}"
      end

      def get_feed_internal
        {
          awards: {
            total: items_with_floats(awards_data).collect { |item| item['value'] }.sum,
            items: items_with_floats(awards_data)
          },
          cost: {
            total: items_with_floats(cost_data).collect { |item| item['value'] }.sum,
            items: items_with_floats(cost_data)
          },
          profile: {
            items: [
              {
                title: 'Level',
                subvalues: subvaluesLevel
              },
              {
                title: 'Enrollment',
                subvalues: subvaluesEnrollment
              },
              {
                title: 'Residency',
                subvalues: subvaluesResidency
              },
              {
                title: 'Housing',
                subvalues: housing
              },
              {
                title: 'SHIP (Student Housing Insurance Program)',
                subvalues: subvaluesSHIP
              },
              {
                title: 'SAP Status',
                value: snapshot_data[0].try(:[], 'sap_status')
              },
              {
                title: 'Verification Status',
                value: snapshot_data[0].try(:[], 'verification_status')
              },
              {
                title: 'Family Members in College',
                value: isir.try(:[], 'family_in_college')
              },
              {
                title: 'Estimated Graduation',
                value: status.try(:[], 'exp_grad_term')
              },
              {
                title: 'Dependency Status',
                value: isir.try(:[], 'dependency_status')
              },
              {
                title: 'Expected Family Contribution (EFC)',
                value: isir.try(:[], 'primary_efc')
              },
              {
                title: 'Berkeley Parent Contribution',
                value: snapshot_data[0].try(:[], 'berkeley_pc')
              }
            ]
          }
        }
      end

      def items_with_floats(data)
        items_with_floats ||= data.collect do |item_to_float|
          item_to_float.merge({ 'value' => item_to_float['value'].to_f })
        end
      end

      # Awards
      def awards_data
        @awards_data ||= Queries.get_award_comparison_awards(@uid, aid_year: @aid_year, effective_date: @effective_date)
      end

      # Expected Cost of Attendance
      def cost_data
        @cost_data ||= Queries.get_award_comparison_cost(@uid, aid_year: @aid_year, effective_date: @effective_date)
      end

      # Profile Data
      def level
        @level ||= EdoOracle::FinancialAid::Queries.get_finaid_profile_acad_level(@uid, aid_year: @aid_year, effective_date: @effective_date)
      end

      def enrollment
        @enrollment ||= EdoOracle::FinancialAid::Queries.get_finaid_profile_enrollment(@uid, aid_year: @aid_year, effective_date: @effective_date)
      end

      def residency
        @residency ||= EdoOracle::FinancialAid::Queries.get_finaid_profile_residency(@uid, aid_year: @aid_year, effective_date: @effective_date)
      end

      def housing
        @housing ||= EdoOracle::FinancialAid::Queries.get_housing(@uid, aid_year: @aid_year, effective_date: @effective_date)
      end

      def ship_status
        @ship_status ||= EdoOracle::FinancialAid::Queries.get_finaid_profile_SHIP(@uid, aid_year: @aid_year, effective_date: @effective_date)
      end

      def isir
        @isir ||= EdoOracle::FinancialAid::Queries.get_finaid_profile_isir(@uid, aid_year: @aid_year, effective_date: @effective_date)
      end

      def status
        @status ||= EdoOracle::FinancialAid::Queries.get_finaid_profile_status(@uid, aid_year: @aid_year, effective_date: @effective_date)
      end

      def snapshot_data
        @snapshot_data ||= Queries.get_award_comparison_snapshot_data(@uid, aid_year: @aid_year, effective_date: @effective_date)
      end

      def subvaluesLevel
        @subvaluesLevel ||= level.map.try(:each) do |item|
          {
            subvalue: [
              item.try(:[], 'term_descr'),
              item.try(:[], 'acad_level')
            ]
          }
        end
      end

      def subvaluesEnrollment
        @subvaluesEnrollment ||= enrollment.map.try(:each) do |item|
          {
            subvalue: [
              item.try(:[], 'term_descr'),
              item.try(:[], 'term_units')
            ]
          }
        end
      end

      def subvaluesResidency
        @subvaluesResidency ||= residency.map.try(:each) do |item|
          {
            subvalue: [
              item.try(:[], 'term_descr'),
              item.try(:[], 'residency')
            ]
          }
        end
      end

      def subvaluesHousing
        @subvaluesHousing ||= housing.map.try(:each) do |item|
          {
            subvalue: [
              item.try(:[], 'term_descr'),
              item.try(:[], 'housing_option')
            ]
          }
        end
      end

      def subvaluesSHIP
        @subvaluesSHIP ||= ship_status.map.try(:each) do |item|
          {
            subvalue: [
              item.try(:[], 'term_descr'),
              item.try(:[], 'ship_status')
            ]
          }
        end
      end

    end
  end
end
