require 'test_helper'

class TasksControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create!(name: 'Sam Smith',
                         email: 'sam@example.com',
                         password: 'welcome',
                         password_confirmation: 'welcome')
    @task = @user.tasks.create!(title: 'Learn Rails', creator_id: @user.id)
    @headers = headers(@user)
  end

  def test_list_all_tasks_for_a_user
    get tasks_url, headers: @headers
    assert_response :success
    response_body = response.parsed_body
    assert_equal %w[pending completed], response_body['tasks'].keys
  end

  def test_create_a_valid_task
    post tasks_url, params: { task: { title: 'Learn Ruby', user_id: @user.id } }, headers: @headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json['notice'], t('successfully_created', entity: 'Task')
  end

  def test_create_task_with_blank_title
    post tasks_url, params: { task: { title: '', user_id: @user.id } }, headers: @headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json['errors'], "Title can't be blank"
  end

  def test_update_task
    put "/tasks/#{@task.slug}", params: { task: { title: 'Learn React', user_id: 1, authorize_owner: true } },
                                headers: @headers
    response_json = response.parsed_body
    assert_equal response_json['notice'], 'Successfully updated task.'
  end

  def test_destroy_task
    initial_task_count = @user.tasks.size

    delete "/tasks/#{@task.slug}", headers: @headers
    response_json = response.parsed_body
    assert_equal response_json['notice'], 'Successfully deleted task.'
    assert_equal @user.tasks.size, initial_task_count - 1
  end
end
