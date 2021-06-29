require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  def test_create_a_valid_user
    post users_url, params: { user: { name: 'Sam Smith',
                                      email: 'sam@example.com',
                                      password: 'welcome',
                                      password_confirmation: 'welcome' } }
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json['notice'], t('successfully_created', entity: 'User')
  end

  def test_user_should_return_error_for_invalid_data
    post users_url, params: { user: { name: 'Sam Smith',
                                      email: 'sam@example.com',
                                      password: 'welcome',
                                      password_confirmation: 'not matching confirmation' } }

    assert_response 422
    assert_equal "Password confirmation doesn't match Password", response.parsed_body['notice']
  end
end
