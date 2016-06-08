import Ember from 'ember';

export default Ember.Route.extend({
  headData: Ember.inject.service(),

  model(params) {
    return this.store.queryRecord('post', { slug: params.slug });
  },

  afterModel(model) {
    const title = model.get('title'),
      description = model.get('description');

    this.set('headData.title', title.toLowerCase() + ' | aaron petcoff | web developer | brooklyn');
    this.set('headData.description', description);
    // scroll to top of window after
    // transition between posts
    if (window && window.ga) {
      // window.scrollTo(0, 0);
      ga('send', 'event', 'post', 'click', model.get('title'));
    }
  }
});
