/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.post('/jira', controller.jira.index)
  router.post('/gitlabMsg', controller.gitlab.index)
  router.get('/saveWord', controller.home.saveWord)
}
