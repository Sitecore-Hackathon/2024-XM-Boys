import {
  ComponentParams,
  Field,
  LinkField,
  useSitecoreContext,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Link, RichText, Text } from '@sitecore-jss/sitecore-jss-react';
import { ComponentProps } from 'lib/component-props';
import styles from 'assets/sass-modules/call-to-action-row.module.scss';
import { useRef, useState, useEffect } from 'react';
import { hasContent } from 'helpers/fields';

interface Fields {
  heading: Field<string>;
  copy: Field<string>;
  primaryCta: LinkField;
  secondaryCta: LinkField;
}

type CallToActionRowProps = ComponentProps & {
  fields: Fields;
  params: ComponentParams;
};

const CallToActionRow = ({ fields, params }: CallToActionRowProps) => {
  const id = params.RenderingIdentifier;
  const [visible, setVisible] = useState(false);
  const [renderObj, setRenderObj] = useState(null);
  const ref = useRef(null);
  const ctx = useSitecoreContext();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (visible) return;
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    setRenderObj(ref.current);

    if (renderObj) {
      observer.observe(renderObj);
    }

    return () => {
      if (renderObj) {
        observer.unobserve(renderObj);
      }
    };
  }, [renderObj, visible]);

  return (
    <section
      className={`container ${params.styles} block-module `}
      id={id ? id : undefined}
      ref={ref}
    >
      <div
        className={`${styles['call-to-action-row']} ${
          visible ? styles['call-to-action-row--show'] : ''
        } row`}
      >
        <div className={`${styles['call-to-action-row__content']} col-xl-8`}>
          <Text className={styles['call-to-action-row__heading']} tag="h2" field={fields.heading} />
          <RichText className={`rtf`} field={fields.copy} />
          {(hasContent(ctx, fields.primaryCta) || hasContent(ctx, fields.secondaryCta)) && (
            <div className={styles['call-to-action-row__cta-wrapper']}>
              {hasContent(ctx, fields.primaryCta) && (
                <Link field={fields.primaryCta} className={`button button--secondary-on-dark`} />
              )}
              {hasContent(ctx, fields.secondaryCta) && (
                <Link field={fields.secondaryCta} className={`link link-chevron link--on-dark`} />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const Default = withDatasourceCheck()<CallToActionRowProps>(CallToActionRow);
