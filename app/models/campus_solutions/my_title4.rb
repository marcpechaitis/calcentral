module CampusSolutions
  class MyTitle4 < UserSpecificModel

    def update(params = {})
      Rails.logger.info("-" * 80)
      Rails.logger.info("uid::" + @uid.inspect)
      Rails.logger.info("params::" + params.inspect)

      proxy = CampusSolutions::Title4.new({user_id: @uid, params: params})
      FinancialAidExpiry.expire @uid
      proxy.get
    end

  end
end
