import React from "react";
import PropTypes from "prop-types";
import ImPropTypes from "react-immutable-proptypes";
import Im from "immutable";
import SwaggerUI from 'swagger-ui';
import { sanitizeUrl } from "@braintree/sanitize-url";

const createDeepLinkPath = (str) => typeof str === "string" || str instanceof String ? str.trim().replace(/\s/g, "_") : "";

export default class OperationTag extends React.Component {

  static defaultProps = {
    tag: "",
    tagObj: Im.fromJS({})
  };

  static propTypes = {
    tag: PropTypes.string.isRequired,
    tagObj: ImPropTypes.map.isRequired,

    layoutActions: PropTypes.object.isRequired,
    layoutSelectors: PropTypes.object.isRequired,

    getComponent: PropTypes.func.isRequired,
    getConfigs: PropTypes.func.isRequired
  };

  render() {
    const {
      children,
      getConfigs,
      getComponent,
      layoutSelectors,
      layoutActions,
      tag,
      tagObj
    } = this.props;

    let {
      deepLinking,
      docExpansion
    } = getConfigs();

    const isDeepLinkingEnabled = deepLinking && deepLinking !== "false";

    const Collapse = getComponent("Collapse");
    const Markdown = getComponent("Markdown");
    const DeepLink = getComponent("DeepLink");

    let tagDescription = tagObj.getIn(["tagDetails", "description"], null);
    let tagExternalDocsDescription = tagObj.getIn(["tagDetails", "externalDocs", "description"]);
    let tagExternalDocsUrl = tagObj.getIn(["tagDetails", "externalDocs", "url"]);

    let isShownKey = ["operations-tag", createDeepLinkPath(tag)];
    let showTag = layoutSelectors.isShown(isShownKey, docExpansion === "full" || docExpansion === "list");

    return (
      <div className={showTag ? "opblock-tag-section is-open" : "opblock-tag-section"} >

        <h3
          onClick={() => layoutActions.show(isShownKey, !showTag)}
          className={!tagDescription ? "opblock-tag no-desc" : "opblock-tag" }
          id={isShownKey.join("-")}>
          <DeepLink
            enabled={isDeepLinkingEnabled}
            isShown={showTag}
            path={tag}
            text={tag} />
          { !tagDescription ? <small></small> :
            <small>
                <Markdown source={tagDescription} />
              </small>
            }

            <div>
              { !tagExternalDocsDescription ? null :
                <small>
                    { tagExternalDocsDescription }
                      { tagExternalDocsUrl ? ": " : null }
                      { tagExternalDocsUrl ?
                        <a
                            href={sanitizeUrl(tagExternalDocsUrl)}
                            onClick={(e) => e.stopPropagation()}
                            target={"_blank"}
                            >{tagExternalDocsUrl}</a> : null
                          }
                  </small>
                }
            </div>

            <button
              className="expand-operation"
              title={showTag ? "Collapse operation": "Expand operation"}
              onClick={() => layoutActions.show(isShownKey, !showTag)}>

              <svg className="arrow" width="20" height="20">
                <use href={showTag ? "#large-arrow-down" : "#large-arrow"} xlinkHref={showTag ? "#large-arrow-down" : "#large-arrow"} />
              </svg>
            </button>
        </h3>

        <Collapse isOpened={showTag}>
          {children}
        </Collapse>
      </div>
    );
  }
}
