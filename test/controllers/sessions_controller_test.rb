require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(name: 'Test', email: 'test@example.com', password: 'welcome', password_confirmation: 'welcome')
  end

  def test_valid_email_and_password_should_be_able_to_log_in
    post sessions_url, params: { login: { email: @user.email, password: @user.password } }, as: :json
    assert_response :success
  end

  def test_wrong_combination_of_email_and_password_should_not_be_able_to_log_in
    non_existent_email = 'this_email_does_not_exist_in_db@example.email'
    post sessions_url, params: { login: { email: non_existent_email, password: 'welcome' } }, as: :json

    assert_response 401
    assert_equal 'Incorrect credentials, try again.', response.parsed_body['notice']
  end

  def test_should_return_auth_token
    post sessions_url, params: { login: { email: @user.email, password: @user.password } }, as: :json

    assert_response :success
    assert response.parsed_body['auth_token']
  end
end
