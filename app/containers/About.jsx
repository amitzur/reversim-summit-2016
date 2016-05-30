import React from 'react';
import classNames from 'classnames/bind';
import stylesAbout from 'css/components/about';
import styles from 'css/main';

import img1 from 'images/imac-371x412.png';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = () => {
  return (

        <section id="about" className={cx('section', 'align-center')}>
          <div className={cx("container")}>
            <span data-icon className={cx('icon', 'section-icon', 'icon-multimedia-12')}></span>
            <h3>About</h3>
            <p className={cx("text-alt")}>About the conference, topics, important dates, etc.</p>
            <br />
            <br />

            <div className={cx('tabs-wrapper', 'tabs-horizontal')}>
              <ul className={cx('nav', 'nav-tabs')}>
                <li className={cx("active")}><a href="#horizontal_tab1" data-toggle="tab">
                  <h6 className={cx("heading-alt")}><span className={cx('fa', 'fa-code')}></span> General info</h6>
                </a></li>
                <li><a href="#horizontal_tab2" data-toggle="tab">
                  <h6 className={cx("heading-alt")}><span className={cx('fa', 'fa-rocket')}></span> Topics</h6>
                </a></li>
                <li><a href="#horizontal_tab3" data-toggle="tab">
                  <h6 className={cx("heading-alt")}><span className={cx('fa', 'fa-external-link')}></span> Sponsor info</h6>
                </a></li>
              </ul>

              <div className={cx("tab-content")}>
                <div id="horizontal_tab1" className={cx('tab-pane', 'fade', 'active', 'in')}>
                  <div className={cx('col-sm-5', 'img-column')}>
                    <img src={img1} alt="" className={cx("img-responsive")} />
                  </div>
                  <div className={cx('col-sm-7', 'align-left')}>
                    <h6>About Reversim Summit</h6>
                    <p>Faucibus sed pretium. Ridiculus <strong>consectetuer</strong> et. In arcu enim sit in libero scelerisque mauris sed. Nullam eleifend in varius arcu vitae feugiat magna id ut morbi consectetuer. In vivamus arcu. Id ut dui. Sed massa in. Scelerisque suscipit quisque maecenas aliquet in. Wisi mi ipsum. Elit et mauris. Duis in magni praesent <a href="#">content</a> massa.</p>
                    <p>Consectetuer amet wisi felis sem <strong>tincidunt</strong>. Ultricies blandit id euismod inceptos mauris pulvinar nec nullam quisque consequat nulla eleifend elementum vivamus aliquam placerat nec. Vehicula leo praesent vitae leo mauris ullamcorper lectus sed mollis id turpis dui cras suspendisse. Porta diam <a href="#">eleifend</a>. Praesent magnis sit. Enim ligula vel justo urna.</p>
                    <ul>
                      <li>Nisl cras vitae wisi odio amet.</li>
                      <li>Lacus amet vestibulum belas</li>
                      <li>Quis nunc curabitur assumenda</li>
                    </ul>
                  </div>
                </div>

                <div id="horizontal_tab2" className={cx('tab-pane', 'fade')}>
                  <div className={cx('col-sm-7', 'align-right')}>
                    <h6>Topics</h6>
                    <p>Faucibus sed pretium. Ridiculus <strong>consectetuer</strong> et. In arcu enim sit in libero scelerisque mauris sed. Nullam eleifend in varius arcu vitae feugiat magna id ut morbi consectetuer. In vivamus arcu. Id ut dui. Sed massa in. Scelerisque suscipit quisque maecenas aliquet in. Wisi mi ipsum. Elit et mauris. Duis in magni praesent <a href="#">content</a> massa.</p>
                    <p>Consectetuer amet wisi felis sem <strong>tincidunt</strong>. Ultricies blandit id euismod inceptos mauris pulvinar nec nullam quisque consequat nulla eleifend elementum vivamus aliquam placerat nec. Vehicula leo praesent vitae leo mauris ullamcorper lectus sed mollis id turpis dui cras suspendisse. Porta diam <a href="#">eleifend</a>. Praesent magnis sit. Enim ligula vel justo urna.</p>
                    <ul>
                      <li>Nisl cras vitae wisi odio amet.</li>
                      <li>Lacus amet vestibulum belas</li>
                      <li>Quis nunc curabitur assumenda</li>
                    </ul>
                  </div>

                  <div className={cx('col-sm-5', 'img-column')}>
                    <img src={img1} alt="" className={cx("img-responsive")} />
                  </div>
                </div>

                <div id="horizontal_tab3" className={cx('tab-pane', 'fade')}>
                  <div className={cx('col-sm-5', 'img-column')}>
                    <img src={img1} alt="" className={cx("img-responsive")} />
                  </div>
                  <div className={cx('col-sm-7', 'align-left')}>
                    <h6>Sponsors apply</h6>
                    <p>Faucibus sed pretium. Ridiculus <strong>consectetuer</strong> et. In arcu enim sit in libero scelerisque mauris sed. Nullam eleifend in varius arcu vitae feugiat magna id ut morbi consectetuer. In vivamus arcu. Id ut dui. Sed massa in. Scelerisque suscipit quisque maecenas aliquet in. Wisi mi ipsum. Elit et mauris. Duis in magni praesent <a href="#">content</a> massa.</p>
                    <ul>
                      <li>Nisl cras vitae wisi odio amet.</li>
                      <li>Lacus amet vestibulum belas</li>
                      <li>Quis nunc curabitur assumenda</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
};

export default About;
