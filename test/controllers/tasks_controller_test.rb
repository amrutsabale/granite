require 'test_helper'

class TasksControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(name: 'Test', email: 'test@example.com', password: 'welcome', password_confirmation: 'welcome')
    post sessions_url, params: { login: { email: @user.email, password: @user.password } }, as: :json
    @task = @user.tasks.create(title: 'Test task')
    @headers = headers(@user)
  end

  def test_list_all_tasks_for_a_user
    get tasks_url, headers: @headers
    assert_response :success
    response_body = response.parsed_body
    assert_equal %w[pending completed], response_body['tasks'].keys
  end

  def test_create_a_valid_task
    post tasks_url, params: { task: { title: 'Test task 1', user_id: @user.id } }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json['notice'], t('successfully_created', entity: 'Task')
  end

  def test_create_task_with_blank_title
    post tasks_url, params: { task: { title: '', user_id: @user.id } }, headers: @headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json['errors'], ["Title can't be blank"]
  end

  def test_destroy_task
    # post sessions_url, params: { login: { email: @user.email, password: @user.password } }, as: :json
    # assert_response :success
    puts response.parsed_body
    puts "/tasks/#{@task.slug}"
    delete "/tasks/#{@task.slug}", headers: @headers
    response_json = response.parsed_body
    puts response_json
    assert_equal response_json['notice'], 'Successfully deleted task.'
  end
end
