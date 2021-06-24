require 'test_helper'

class HomeControllerTest < ActionDispatch::IntegrationTest
  def test_should_get_index
    get root_url
    assert_response :success
  end
end
