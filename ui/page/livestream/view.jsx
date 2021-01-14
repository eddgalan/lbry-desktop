// @flow
import React from 'react';
import classnames from 'classnames';
import { Lbry } from 'lbry-redux';
import Page from 'component/page';
import FileTitle from 'component/fileTitle';
import Card from 'component/common/card';
import Spinner from 'component/spinner';
import DateTime from 'component/dateTime';
import CommentCreate from 'component/commentCreate';

type Props = {
  claim: ?Claim,
  uri: string,
  bitwaveUrl: string,
  doResolveUri: string => void,
};

export default function LiveStreamPage(props: Props) {
  const { claim, uri, bitwaveUrl, doResolveUri } = props;
  const [comments, setComments] = React.useState([]);
  const claimId = claim && claim.claim_id;

  React.useEffect(() => {
    if (uri) {
      doResolveUri(uri);
    }
  }, [uri, doResolveUri]);

  React.useEffect(() => {
    function fetchComments() {
      Lbry.comment_list({
        claim_id: claimId,
        page: 1,
        page_size: 50,
        include_replies: false,
        skip_validation: true,
      }).then(response => {
        const comments = response.items;
        if (comments) {
          setComments(comments);
        }
      });
    }

    if (claimId) {
      setInterval(() => {
        fetchComments();
      }, 5000);
    }
  }, [claimId]);

  if (!claim) {
    return null;
  }

  return (
    <Page className="file-page" filePage>
      <div className={classnames('section card-stack')}>
        <div className={classnames('file-render file-render--video livestream')}>
          <div className="file-viewer">
            <iframe src={bitwaveUrl} />
          </div>
        </div>

        <FileTitle uri={uri} />
      </div>
      <Card
        title="Live Discussion"
        smallTitle
        className="file-page__recommended card"
        actions={
          <>
            <div className="livestream__comments">
              {comments.length ? (
                comments.map(comment => (
                  <div key={comment.comment_id} className="livestream__comment">
                    <div className="livestream__comment-meta">
                      <div className="livestream__comment-author">{comment.channel_name}</div>
                      <div className="">
                        <DateTime date={comment.timestamp * 1000} timeAgo />
                      </div>
                    </div>
                    <div className="">{comment.comment}</div>
                  </div>
                ))
              ) : (
                <div className="main--empty">
                  <Spinner />
                </div>
              )}
            </div>

            <div className="livestream__comment-create">
              <CommentCreate uri={uri} />
            </div>
          </>
        }
      />
    </Page>
  );
}
