class TasksController < ApplicationController
  before_action :authenticate_user_using_x_auth_token
  before_action :load_task, only: %i[show update destroy]

  def index
   tasks = Task.all
   render status: :ok, json: { tasks: tasks }
  end

  def show
    task_creator = User.find(@task.creator_id).name
    render status: :ok, json: { task: @task, assigned_user: @task.user, task_creator: task_creator }
  end

  def create
    @task = Task.new(task_params.merge(creator_id: @current_user.id))
    if @task.save
      render status: :ok, json: { notice: t('successfully_created',entity:"Task") }
    else
      errors = @task.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors  }
    end
  rescue ActiveRecord::RecordNotUnique => e
    render status: :unprocessable_entity, json: { errors: e.message }
  end

  def update
    if @task.update(task_params)
      render status: :ok, json: { notice: 'Successfully updated task.' }
    else
      render status: :unprocessable_entity, json: { errors: @task.errors.full_messages }
    end
  end

  def destroy
    if @task.destroy
      render status: :ok, json: { notice: 'Successfully deleted task.' }
    else
      render status: :unprocessable_entity, json: { errors:
      @task.errors.full_messages }
    end
  end

  private

  def task_params
    params.require(:task).permit(:title, :user_id)
  end

  def load_task
    @task = Task.find_by_slug!(params[:slug])
    rescue ActiveRecord::RecordNotFound => errors
      render json: {errors: errors}
  end
end