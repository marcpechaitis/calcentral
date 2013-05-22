class MyAcademics::Semesters

  include MyAcademics::AcademicsModule

  # Example:
  # {
  #  :course_number => course_number,
  #  :ccn => ccn,
  #  :title => title,
  #  :units => units,
  #  :grade_option => grade_option,
  #  :section => section,
  #  :format => format,
  #  :schedule => schedule_string,
  #  :instructor => instructor
  #}
  #
  def merge(data)
    proxy = CampusUserCoursesProxy.new({:user_id => @uid})
    feed = proxy.get_campus_courses

    semesters = []
    schedule = []

    feed.each do |course|
      course_number = course[:course_code]
      next unless course_number.strip.length

      units = course[:unit]
      title = course[:name].titleize
      grade_option = course[:pnp_flag].upcase == "Y" ? "P/NP" : "Letter"
      ccn = course[:ccn]
      format = course[:instruction_format]
      section = course[:section_num]
      # TODO add class location
      schedule_string = "#{course[:meeting_days]} #{course[:meeting_start_time]}#{course[:meeting_start_time_ampm_flag]}-#{course[:meeting_end_time]}#{course[:meeting_end_time_ampm_flag]}"
      instructor = course[:instructor]
      schedule << {
        :course_number => course_number,
        :ccn => ccn,
        :title => title,
        :units => units,
        :grade_option => grade_option,
        :section => section,
        :format => format,
        :schedule => schedule_string,
        :instructor => instructor
      }
    end

    # TODO handle multiple current semesters as defined in Settings.current_terms_codes
    # TODO Translate semester codes into English.
    semester_name = "#{Settings.sakai_proxy.current_terms_codes[0].term_cd} #{Settings.sakai_proxy.current_terms_codes[0].term_yr}"
    semesters << {
      :name => semester_name,
      :slug => make_slug(semester_name),
      :is_current => true,
      :schedule => schedule
    }

    data[:semesters] = semesters
    data[:current_semester_index] = 0
  end
end
