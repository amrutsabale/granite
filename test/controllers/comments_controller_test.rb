require 'test_helper'

class CommentsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(name: 'Sam Smith',
                         email: 'sam@example.com',
                         password: 'welcome',
                         password_confirmation: 'welcome')
    @task = @user.tasks.create!(title: 'Learn Ruby')
    @headers = headers(@user)
  end

  def test_create_a_valid_comment
    post comments_url, params: { comment: { content: 'Wow!', task_id: @task.id } }, headers: @headers
    assert_response :success
    assert_equal @task.comments.last.content, 'Wow!'
  end

  def test_create_comment_with_blank_title
    post comments_url, params: { comment: { content: '', task_id: @task.id } }, headers: @headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json['errors'], "Content can't be blank"
  end
end
