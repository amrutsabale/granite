require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  def setup
    @user = User.create(name: 'Sam Smith',
                        email: 'sam@example.com',
                        password: 'welcome',
                        password_confirmation: 'welcome')
    Task.delete_all
    @task = Task.new(title: 'This is a test task', user: @user)
  end

  def test_instance_of_task
    task = Task.new
    # See if object task actually belongs to Task
    assert_instance_of Task, task
  end

  def test_value_of_title_assigned
    assert_equal 'This is a test task', @task.title
  end

  def test_value_created_at
    assert_nil @task.created_at
    @task.save!
    assert_not_nil @task.created_at
  end

  def test_error_raised
    assert_raises ActiveRecord::RecordNotFound do
      Task.find(SecureRandom.uuid)
    end
  end

  def test_count_of_number_of_tasks
    assert_difference ['Task.count'] do
      Task.create!(title: 'Creating a task through test', user: @user)
    end
  end

  def test_count_of_number_of_tasks_more_than_one
    assert_difference ['Task.count'], 2 do
      Task.create!(title: 'Creating a task through test', user: @user)
      Task.create!(title: 'Creating another task through test', user: @user)
    end
  end

  def test_task_should_not_be_valid_without_title
    @task.title = ''
    assert @task.invalid?
  end

  def test_task_slug_is_parameterized_title
    title = @task.title
    @task.save!
    assert_equal title.parameterize, @task.slug
  end

  def test_incremental_slug_generation_for_tasks_with_same_title
    first_task = Task.create!(title: 'test task', user: @user)
    second_task = Task.create!(title: 'test task', user: @user)

    assert_equal 'test-task', first_task.slug
    assert_equal 'test-task-2', second_task.slug
  end

  def test_updating_title_does_not_update_slug
    @task.save!
    task_slug = @task.slug

    updated_task_title = 'updated task tile'
    @task.update!(title: updated_task_title)

    assert_equal updated_task_title, @task.title

    assert_equal task_slug, @task.slug
  end

  def test_slug_to_be_reused_after_getting_deleted
    first_task = Task.create!(title: 'test task', user: @user)
    second_task = Task.create!(title: 'test task', user: @user)

    second_task_slug = second_task.slug
    second_task.destroy
    new_task_with_same_title = Task.create!(title: 'test task', user: @user)

    assert_equal second_task_slug, new_task_with_same_title.slug
  end
end
