'use client';

import React, { JSX } from 'react';
import Image from 'next/image';
import { FiChrome, FiTwitter } from 'react-icons/fi';
import { FaTelegram } from "react-icons/fa6";
import { Token } from '@/types/graphql';
import { getTimeAgo } from '@/lib/bigint-utils';
import { Card, AddressLink } from '@/components';

interface TokenHeaderProps {
  token: Token;
  className?: string;
}

interface SocialLinkProps {
  href: string;
  icon: React.JSX.Element;
  label: string;
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-core-orange-100 text-gray-600 hover:text-core-orange-600 transition-colors duration-200"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

function TokenImage({ src, alt, size = 'lg' }: { src?: string; alt: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = {
    sm: { width: 32, height: 32, className: 'w-8 h-8' },
    md: { width: 48, height: 48, className: 'w-12 h-12' },
    lg: { width: 80, height: 80, className: 'w-20 h-20' },
  };

  const { width, height, className } = sizeMap[size];

  if (!src) {
    // Fallback to generated avatar
    return (
      <div className={`${className} rounded-full bg-gradient-to-r from-core-orange-500 to-bitcoin-gold-500 flex items-center justify-center text-white font-bold text-2xl`}>
        {alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} rounded-full object-cover border-2 border-gray-200`}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      priority={size === 'lg'}
    />
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-core-orange-600 transition-colors duration-200"
      aria-label={`Copy ${label}`}
    >
      <span className="font-mono">{text}</span>
      {copied ? (
        <svg className="w-4 h-4 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

export function TokenHeader({ token, className }: TokenHeaderProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const socialLinks = [
    token.website ? {
      href: token.website,
      label: 'Website',
      icon: <FiChrome className="w-5 h-5" />,
    } : null,
    token.telegram ? {
      href: token.telegram,
      label: 'Telegram',
      icon: <FaTelegram className="w-5 h-5" />,
    } : null,
    token.twitter ? {
      href: token.twitter,
      label: 'Twitter',
      icon: <FiTwitter className="w-5 h-5" />,
    } : null,
  ].filter((link): link is { href: string; label: string; icon: JSX.Element } => link !== null);

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Token Image and Basic Info */}
        <div className="flex flex-col md:flex-row items-start gap-4 grow-1">
          <TokenImage src={token.image || undefined} alt={token.symbol} size="lg" />
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text-primary">
                {token.name}
              </h1>
              <span className="text-lg sm:text-xl font-medium text-gray-600 dark:text-dark-text-secondary">
                ({token.symbol})
              </span>
            </div>
            
            {token.description && (
              <p className="text-gray-700 dark:text-dark-text-secondary mb-4 leading-relaxed">
                {token.description}
              </p>
            )}
            
            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  {socialLinks.map((link, index) => (
                    <SocialLink
                      key={index}
                      href={link.href}
                      icon={link.icon}
                      label={link.label}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Creator and Creation Info */}
        <div className="flex flex-col gap-4 sm:min-w-[280px]">
          <div className="flex md:flex-col justify-between flex-wrap space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary block mb-1">
                Creator
              </span>
              <AddressLink 
                address={token.creator}
                label="creator address"
              />
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary block mb-1">
                Contract
              </span>
              <AddressLink 
                address={token.id}
                label="contract address"
              />
            </div>
            
            <div>
              <span className="text-sm font-medium text-gray-600 dark:text-dark-text-secondary block mb-1">
                Created
              </span>
              <span className="text-sm text-gray-700 dark:text-dark-text-secondary">
                {getTimeAgo(token.createdAt)}
              </span>
            </div>
          </div>

          {/* Graduation Status */}
          {token.graduated && (
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-success-50 dark:bg-dark-success-bg border border-success-200 dark:border-dark-success-border rounded-lg">
              <svg className="w-5 h-5 text-success-500 dark:text-dark-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-success-700 dark:text-dark-success">
                Graduated to DEX
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
