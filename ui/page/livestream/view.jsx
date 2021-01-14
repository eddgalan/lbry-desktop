// @flow
import React from 'react';
import classnames from 'classnames';
import Page from 'component/page';
import Button from 'component/button';
import Card from 'component/common/card';
import I18nMessage from 'component/i18nMessage';

type Props = {};

export default function YoutubeSync(props: Props) {
  const {} = props;

  return (
    <Page className="file-page" filePage>
      <div className={classnames('section card-stack')}>
        <div className={classnames('file-render file-render--video livestream')}>
          <div className="file-viewer">
            <iframe src="https://bitwave.tv/embed/doomtube" />
          </div>
        </div>

        <div className="file-page__secondary-content">
          <div>
            <h1>Title</h1>

            {/* <CommentsList uri={uri} linkedComment={linkedComment} /> */}
          </div>
          {/* {videoTheaterMode && <RecommendedContent uri={uri} />} */}
        </div>
      </div>
      <Card title="Comments" smallTitle className="file-page__recommended card" />
    </Page>
  );
}
