'use strict';

/**
 * Profile Factory
 */
angular.module('calcentral.factories').factory('profileFactory', function(apiService, $http) {
  var urlAddressFields = '/api/campus_solutions/address_label';
  var urlConfidentialStudentMessage = '/api/campus_solutions/confidential_student_message';
  var urlCountries = '/api/campus_solutions/country';
  var urlDeleteLanguage = '/api/campus_solutions/language';
  var urlEmergencyContacts = '/api/campus_solutions/emergency_contacts';
  // var urlLanguageCodes = '/dummy/json/language_codes.json';
  var urlLanguageCodes = '/api/campus_solutions/language_code';
  // var urlPerson = '/dummy/json/student_with_languages.json';
  var urlCurrencies = '/api/campus_solutions/currency_code';
  var urlPerson = '/api/my/profile';
  var urlStates = '/api/campus_solutions/state';
  var urlTypes = '/api/campus_solutions/translate';
  var urlTypesPayFrequency = urlTypes + '?field_name=PAY_FREQ_ABBRV';
  var urlTypesRelationship = urlTypes + '?field_name=RELATIONSHIP';
  var urlWorkExperience = '/api/edos/work_experience';

  var urlPostLanguage = '/api/campus_solutions/language';
  var urlPostWorkExperience = '/api/campus_solutions/work_experience';

  var deleteLanguage = function(options) {
    return $http.delete(urlDeleteLanguage + '/' + options.languageCode, options);
  };
  var deleteWorkExperience = function(options) {
    return $http.delete(urlPostWorkExperience + '/' + options.sequenceNbr, options);
  };

  // Get - General
  var getAddressFields = function(options) {
    return apiService.http.request(options, urlAddressFields + '?country=' + options.country);
  };
  var getConfidentialStudentMessage = function(options) {
    return apiService.http.request(options, urlConfidentialStudentMessage);
  };
  var getCountries = function(options) {
    return apiService.http.request(options, urlCountries);
  };
  var getEmergencyContacts = function(options) {
    return apiService.http.request(options, urlEmergencyContacts);
  };
  var getLanguageCodes = function(options) {
    return apiService.http.request(options, urlLanguageCodes);
  };
  var getCurrencies = function(options) {
    return apiService.http.request(options, urlCurrencies);
  };
  var getPerson = function(options) {
    return apiService.http.request(options, urlPerson);
  };
  var getStates = function(options) {
    return apiService.http.request(options, urlStates + '?country=' + options.country);
  };
  var getWorkExperience = function(options) {
    return apiService.http.request(options, urlWorkExperience);
  };
  var getTypesPayFrequency = function(options) {
    return apiService.http.request(options, urlTypesPayFrequency);
  };
  var getTypesRelationship = function(options) {
    return apiService.http.request(options, urlTypesRelationship);
  };

  // Post
  var postLanguage = function(options) {
    return $http.post(urlPostLanguage, options);
  };
  var postWorkExperience = function(options) {
    return $http.post(urlPostWorkExperience, options);
  };

  return {
    deleteLanguage: deleteLanguage,
    deleteWorkExperience: deleteWorkExperience,
    getConfidentialStudentMessage: getConfidentialStudentMessage,
    getCountries: getCountries,
    getCurrencies: getCurrencies,
    getAddressFields: getAddressFields,
    getEmergencyContacts: getEmergencyContacts,
    getLanguageCodes: getLanguageCodes,
    getPerson: getPerson,
    getStates: getStates,
    getTypesPayFrequency: getTypesPayFrequency,
    getTypesRelationship: getTypesRelationship,
    getWorkExperience: getWorkExperience,
    postLanguage: postLanguage,
    postWorkExperience: postWorkExperience
  };
});
