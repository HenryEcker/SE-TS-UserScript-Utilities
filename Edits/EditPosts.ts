import {ajaxPostWithData} from '../Utilities/General';
import type {IdType} from '../Utilities/Types';


interface EditTagResponse {
    success: boolean;
    html: string; // full html for tags component
}

export function editTags(postId: IdType, tags: string, reviewTaskId?: IdType) {
    return ajaxPostWithData<EditTagResponse>(
        `/posts/${postId}/edit-tags`,
        {
            tagnames: tags,
            fkey: StackExchange.options.user.fkey,
            reviewTaskId: reviewTaskId // undefined if no review task
        }
    );
}

interface PostEditResponse {
    html: string; // full html for container: includes body, tags, usercards, etc.
    message: 'ok'; // some message
    redirectTo: string; // url to return to after edit completes
    success: boolean;
    title: string; // current title (after edit)
}

export function editPost(
    postId: IdType,
    revisionGuid: string,
    title: string,
    postText: string,
    tags: string,
    editComment: string,
    isCurrent = true,
    author?: string
) {
    return ajaxPostWithData<PostEditResponse>(
        `/posts/${postId}/edit-submit/${revisionGuid}`,
        {
            'is-current': isCurrent,
            'title': title,
            'post-text': postText,
            'fkey': StackExchange.options.user.fkey,
            'author': author ?? '',
            'tagnames': tags,
            'edit-comment': editComment
        }
    );
}

interface PostEditorHeartbeatResponse {
    'draftSaved': boolean;
    'disableEditor': boolean;
    'breakoutSimilarQuestions': boolean;
}

export function postEditorHeartbeat(postId: IdType, clientRevisionGuid: string) {
    return ajaxPostWithData<PostEditorHeartbeatResponse>(
        `/posts/${postId}/editor-heartbeat/edit`,
        {
            fkey: StackExchange.options.user.fkey,
            clientRevisionGuid: clientRevisionGuid
        }
    );
}

interface ValidateResponse {
    errors: object;
    source: object;
    success: boolean;
    warnings: object;
}

export function validatePostBody(body: string, oldBody: string, isQuestion: boolean, isSuggestedEdit = false) {
    return ajaxPostWithData<ValidateResponse>(
        '/posts/validate-body',
        {
            body: body,
            oldBody: oldBody,
            isQuestion: isQuestion,
            isSuggestedEdit: isSuggestedEdit,
            fkey: StackExchange.options.user.fkey
        }
    );
}

export function validatePostTitle(title: string) {
    return ajaxPostWithData<ValidateResponse>(
        '/posts/validate-title',
        {
            title: title,
            fkey: StackExchange.options.user.fkey
        }
    );
}

export function validatePostTags(tags: string, oldTags: string, postTypeId = 1) {
    return ajaxPostWithData<ValidateResponse>(
        '/posts/validate-title',
        {
            tags: tags,
            oldTags: oldTags,
            fkey: StackExchange.options.user.fkey,
            postTypeId: postTypeId
        }
    );
}


export function isSuggestedEditQueueFull(postId: IdType): Promise<boolean> {
    return fetch(
        `/posts/${postId}/edit`,
        {
            method: 'GET',
            credentials: 'omit' // Send without credentials
        }
    ).then(({status}) => {
        /*
         * Status 200 means can make suggestion i.e. NOT FULL (false)
         * Status 403 means can't make suggestion i.e. FULL   (true)
         */
        return status !== 200;
    });
}

export function discardQuestionDraft() {
    return ajaxPostWithData<{ success: boolean; }>(
        '/post/discard-draft',
        {
            fkey: StackExchange.options.user.fkey,
            postType: 'ask'
        }
    );
}