import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import BaseLayout from 'containers/BaseLayout';
import {createProposal} from 'actions/proposals';
import { push } from 'react-router-redux';
import {updateUser} from 'actions/users';
import ga from 'react-ga';
import features from 'features';

import styles from 'css/main';

const cx = classNames.bind(styles)

class Submit extends Component {

    constructor(props) {
        super(props);

        const {dispatch, user: { authenticated }} = props;
        if (!authenticated) {
          dispatch(push('/'))
        }

        this.state = {
          proposalType: 'full'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleProposalTypeChange = this.handleProposalTypeChange.bind(this);
    }

    handleProposalTypeChange(event) {
      this.setState({ proposalType: event.target.value });
    }

    handleSubmit(event) {
      event.preventDefault();
      const formElements = event.target.elements;

      const { dispatch, user: { authenticated, id } } = this.props;

      if (authenticated) {
        const fullname = formElements.fullname.value;
        const oneLiner = formElements.oneLiner.value;
        const bio = formElements.bio.value;
        const trackRecord = formElements.trackRecord.value;
        const linkedin = formElements.linkedin.value;
        const twitter = formElements.twitter.value;

        const title = formElements.title.value;
        const proposalType = this.state.proposalType;
        const abstract = formElements.abstract.value;

        dispatch(updateUser({
          'profile.name': fullname,
          'profile.bio': bio,
          'profile.trackRecord': trackRecord,
          'profile.linkedin': linkedin,
          'profile.twitter': twitter,
          'profile.oneLiner': oneLiner
        }))
        .then(() => dispatch(createProposal(title, abstract, proposalType, [id])))
        .then((result) => dispatch(push(`session/${result.id}`)))
        .catch(e => ga.exception({
          description: `Error on submit: ${e}`,
          fatal: true
        }));
      }
    }

    renderSubmissionForm() {
      const { user } = this.props;

      return (
        <div style={{marginTop: '50px'}} className={cx('col-md-12', 'col-md-offset-2')}>
          <h5>Submission</h5>
          <p>You may submit multiple proposals.</p>
          <p>Call for paper ends: <strong>July 8 midnight UTC</strong>. No kidding.</p>

            <form onSubmit={this.handleSubmit.bind(this)} className={cx('form')}>
              <h6>Bio</h6>
              <fieldset>
                <span className={cx("col-xs-12")}>
                  <label htmlFor="fullname">Full name</label>
                </span>
                <span className={cx("col-xs-5")}>
                  <input id="fullname" ref="fullname" type="text" defaultValue={user.name} required />
                </span>
              </fieldset>

              <fieldset>
                <span className={cx("col-xs-12")}>
                  <label htmlFor="email">Email</label>
                </span>
                <span className={cx("col-xs-5")}>
                  {user.email}
                </span>
                <small className={cx("col-xs-4")}>So we can get in touch with you. Email is only visible to moderators</small>
              </fieldset>

              <fieldset>
                <span className={cx("col-xs-12")}>
                  <label htmlFor="oneLiner">One Liner</label>
                </span>
                <span className={cx("col-xs-5")}>
                  <input id="oneLiner" ref="oneLiner" type="text" defaultValue={user.oneLiner} />
                </span>
                <small className={cx("col-xs-4")}>Optional. will be presented on the website</small>
              </fieldset>

              <fieldset>
                <span className={cx("col-xs-12")}>
                  <label htmlFor="linkedin">Linkedin Profile</label>
                </span>
                <span className={cx("col-xs-5")}>
                  <input id="linkedin" ref="linkedin" type="url" defaultValue={user.linkedin} />
                </span>
                <small className={cx("col-xs-4")}>Optional. will be presented on the website</small>
              </fieldset>

              <fieldset>
                <span className={cx("col-xs-12")}>
                  <label htmlFor="twitter">Twitter @name</label>
                </span>
                <span className={cx("col-xs-5")}>
                  <input id="twitter" ref="twitter" type="text" defaultValue={user.twitter} placeholder="@Reversim" />
                </span>
                <small className={cx("col-xs-4")}>Optional. will be presented on the website</small>
              </fieldset>

              <fieldset>
                <span className={cx("col-xs-12")}>
                  <label htmlFor="bio">Short Bio</label>
                </span>
                <span className={cx("col-xs-5")}>
                  <textarea id="bio" ref="bio" defaultValue={user.bio} />
                </span>
                <small className={cx("col-xs-3")}>This will be presented on the website</small>
              </fieldset>

              <fieldset>
                <span className={cx("col-xs-12")}>
                  <label htmlFor="trackRecord">Track record as speaker</label>
                </span>
                <span className={cx("col-xs-5")}>
                  <textarea id="trackRecord" ref="trackRecord" defaultValue={user.trackRecord} />
                </span>
                <small className={cx("col-xs-3")}>Your speaker track record will vastly improve your chances of getting accepted. The track record should include links to your presentations, most preferable videos of them (plus slides)</small>
              </fieldset>

              <br />
              <h6>Proposal</h6>
                <fieldset>
                  <span className={cx("col-xs-12")}>
                    <label htmlFor="title">Title</label>
                  </span>
                  <span className={cx("col-xs-5")}>
                    <input id="title" ref="title" type="text" required maxLength="100" />
                  </span>
                </fieldset>

                <fieldset>
                  <span className={cx("col-xs-5")}>
                    <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" onChange={this.handleProposalTypeChange.bind(this)} checked={this.state.proposalType === "full"} value="full" /> <label htmlFor="full">Full Featured (30-40 min.)</label></div>
                    <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" onChange={this.handleProposalTypeChange.bind(this)} checked={this.state.proposalType === "lightning"} value="lightning" /> <label htmlFor="lightning">Lightning Talk (5 min.)</label></div>
                    <div><input type="radio" name="proposalType" id="proposalType" ref="proposalType" onChange={this.handleProposalTypeChange.bind(this)} checked={this.state.proposalType === "ossil"} value="ossil" /> <label htmlFor="ossil">Open Source in Israel (10 min.)</label></div>
                  </span>
                </fieldset>

                <fieldset>
                  <span className={cx("col-xs-12")}>
                    <label htmlFor="abstract">Abstract</label>

                  </span>
                  <span className={cx("col-xs-8")}>
                    <textarea id="abstract" ref="abstract" required />
                  </span>
                  <small className={cx("col-xs-8")}>Markdown syntax is supported. You can edit your proposal at any given time during the CFP period.</small>
                </fieldset>

                <fieldset className={cx("col-xs-4", "col-xs-offset-3")} style={{marginTop: '30px'}}>
                  <input type="submit" value="submit" className={cx('btn', 'btn-lg')} />
                </fieldset>
            </form>
        </div>
      )
    }

    render() {
        const { location } = this.props;

        return (
            <BaseLayout currentPath={location.pathname} name="submission-page">

              <section id="submission-info" className={cx('section')}>
                <div className={cx('container')}>
                  <div className={cx('align-center')}>
                    <span data-icon className={cx('icon', 'section-icon', 'icon-multimedia-12')}></span>
                    <h3>Reversim Summit 2016 - Submission</h3>
                  <p className={cx("text-alt")}>{ features('submission', false) ? 'Read carefully before submission!' : 'Call for papers is now closed' }</p>
                    <br />
                    <br />
                  </div>

                    <div className={cx('col-md-8', 'col-md-offset-2')}>
                      <h5>Topics</h5>
                      <p>You may get a good sense of the topics we're interested in by looking into previous events: <a href="http://summit2013.reversim.com">Reversim Summit 2013</a> and <a href="http://summit2014.reversim.com">Reversim Summit 2014</a> and <a href="http://summit2015.reversim.com">Reversim Summit 2015</a>.</p>
                      <p>Apart from that, here's a good grocery list of topics just to give you ideas. We are interested in everything including:</p>
                      <div className={cx('container')}>
                        <ul className={cx('with-bullets', 'col-md-4')}>
                          <li>Software development</li>
                          <li>Product management</li>
                          <li>UX</li>
                          <li>Startups</li>
                          <li>Mobile</li>
                          <li>Web</li>
                        </ul>
                        <ul className={cx('with-bullets', 'col-md-4')}>
                          <li>Devops</li>
                          <li>Data processing</li>
                          <li>Scaling</li>
                          <li>Software company culture</li>
                          <li>Tooling</li>
                        </ul>
                      </div>

                      <p>There is no predefined list of topics, if you’d like to speak about something interesting, we want it!</p>
                      <p>We do not set out with a predefined list of tracks. We would like to leave the topics (tracks) open and only after accepting the submissions we will split the sessions into tracks, but we shall not rule out a single good session just b/c it's not a natural fit to any of the predefined list, so don't worry so much about categorizing your submissions.</p>
                      <p>Generally speaking - we are not looking for “intro to something software” or “something software 101”. We’re looking for something of greater depth. However, we are open to session “intro to something that isn’t software”, as long is this something is of general interest, for example “intro to moonwalking and breakdance”</p>
                      <br /><p>There are three possible session types you may submit:</p>

                      <h6>Full Featured sessions (30-40 minutes)</h6>
                      <p>Full feature are frontal presentations b/w 30 - 40 minutes. They will be held either in the large room (500 ppl) or the small room (200 ppl) in two parallel tracks.</p>
                      <br />
                      <h6>Lightning Sessions (5 minutes)</h6>
                      <p>Lightning are speedy 5 min sessions. They will be presented in a series in which each presenter has exactly 20 slides, 15 sec per slide, slides are auto advanced and in total 5 min. No break b/w the sessions. It's fun, it's speedy, it's concise and it's breathtaking :-)</p>
                      <br />
                      <h6>Open Source in Israel (10 minutes)</h6>
                      <p>We are especially interested in open source projects made in israel or created by Israelis. We will have a special stage for that.</p>
                    </div>

                    <div style={{marginTop: '50px'}} className={cx('col-md-8', 'col-md-offset-2')}>
                      <h5>FAQ</h5>
                      <span className={cx('h7')}>What Language?</span>
                      <p>C. Just kidding. The default language is Hebrew. This is not an international event, it's a local event for local developers and by local developers. There are awesome developers here in Israel. Having said that, if you as a speaker would prefer to speak in English that's totally fine.</p>
                      <p>If you are a non Israeli speaker and would like to present in this conference, you are most welcome, that's perfectly fine, you may do so in English, just be aware that most of the contents is going to be in Hebrew.</p>
                      <br />
                      <span className={cx('h7')}>What do you get for X?</span>
                    <p>Registration will open about a month before the event. If you've registered on time, all is well. If not, <strong>every submitter gets a single personal ticket</strong>, regardless of whether your session got accepted or not (assuming quality submission). <strong>Accepted speakers get a personal ticket +1</strong> (so you can do a friend a favor)</p>
                    </div>

                    { features('submission', false) ? this.renderSubmissionForm() : <div style={{marginTop: '50px'}} className={cx('col-md-12', 'col-md-offset-2')}><h6>Call for papers is closed for submission. You can view the submitted proposals <Link to="proposals">here</Link>.</h6></div> }
                </div>
              </section>

            </BaseLayout>
        );
    }
}

Submit.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Submit);
